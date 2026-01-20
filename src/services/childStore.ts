import { create } from 'zustand';
import { supabase } from './supabase';
import type { Child } from '../types';

interface ChildState {
  children: Child[];
  selectedChild: Child | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchChildren: () => Promise<void>;
  addChild: (child: Omit<Child, 'id' | 'parent_id' | 'created_at' | 'updated_at'>) => Promise<{ error: string | null; childId?: string }>;
  updateChild: (id: string, updates: Partial<Child>) => Promise<{ error: string | null }>;
  deleteChild: (id: string) => Promise<{ error: string | null }>;
  selectChild: (child: Child | null) => void;
  clearChildren: () => void;
}

export const useChildStore = create<ChildState>((set, get) => ({
  children: [],
  selectedChild: null,
  isLoading: false,
  error: null,

  fetchChildren: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ isLoading: false, error: 'Not authenticated' });
        return;
      }

      const { data, error } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Fetch children error:', error);
        set({ isLoading: false, error: error.message });
        return;
      }

      const children = data || [];
      set({
        children,
        isLoading: false,
        // Auto-select first child if none selected
        selectedChild: get().selectedChild || children[0] || null,
      });
    } catch (error) {
      console.error('Fetch children error:', error);
      set({ isLoading: false, error: 'Failed to fetch children' });
    }
  },

  addChild: async (childData) => {
    try {
      set({ isLoading: true, error: null });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ isLoading: false });
        return { error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('child_profiles')
        .insert({
          parent_id: user.id,
          name: childData.name,
          birth_date: childData.birth_date,
          interests: childData.interests || [],
          focus_traits: childData.focus_traits || [],
          avatar_url: childData.avatar_url,
        })
        .select()
        .single();

      if (error) {
        console.error('Add child error:', error);
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }

      const newChild = data as Child;
      const currentChildren = get().children;
      set({
        children: [...currentChildren, newChild],
        selectedChild: get().selectedChild || newChild,
        isLoading: false,
      });

      return { error: null, childId: newChild.id };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add child';
      set({ isLoading: false, error: message });
      return { error: message };
    }
  },

  updateChild: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase
        .from('child_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Update child error:', error);
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }

      const updatedChild = data as Child;
      const currentChildren = get().children;
      set({
        children: currentChildren.map(c => c.id === id ? updatedChild : c),
        selectedChild: get().selectedChild?.id === id ? updatedChild : get().selectedChild,
        isLoading: false,
      });

      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update child';
      set({ isLoading: false, error: message });
      return { error: message };
    }
  },

  deleteChild: async (id) => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase
        .from('child_profiles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete child error:', error);
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }

      const currentChildren = get().children;
      const remainingChildren = currentChildren.filter(c => c.id !== id);
      set({
        children: remainingChildren,
        selectedChild: get().selectedChild?.id === id
          ? remainingChildren[0] || null
          : get().selectedChild,
        isLoading: false,
      });

      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete child';
      set({ isLoading: false, error: message });
      return { error: message };
    }
  },

  selectChild: (child) => {
    set({ selectedChild: child });
  },

  clearChildren: () => {
    set({ children: [], selectedChild: null, isLoading: false, error: null });
  },
}));
