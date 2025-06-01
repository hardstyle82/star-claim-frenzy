
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useUserStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    stars: 0,
    premium_progress: 0,
    total_claims: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchUserStats();
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      let { data: userStats, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // User stats don't exist, create them
        const { data: newStats, error: insertError } = await supabase
          .from('user_stats')
          .insert([
            {
              id: user.id,
              stars: 0,
              premium_progress: 0,
              total_claims: 0,
              referral_code: `REF${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            }
          ])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user stats:', insertError);
          return;
        }
        userStats = newStats;
      } else if (error) {
        console.error('Error fetching user stats:', error);
        return;
      }

      if (userStats) {
        setStats({
          stars: userStats.stars || 0,
          premium_progress: userStats.premium_progress || 0,
          total_claims: userStats.total_claims || 0,
        });
      }
    } catch (error) {
      console.error('Error in fetchUserStats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = async (newStats: Partial<typeof stats>) => {
    if (!user) return;

    const updatedStats = { ...stats, ...newStats };
    setStats(updatedStats);

    try {
      const { error } = await supabase
        .from('user_stats')
        .update(updatedStats)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user stats:', error);
        // Revert local state on error
        setStats(stats);
      }
    } catch (error) {
      console.error('Error in updateStats:', error);
      setStats(stats);
    }
  };

  const addWin = async (winType: string, amount: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wins')
        .insert([
          {
            user_id: user.id,
            win_type: winType,
            amount: amount,
          }
        ]);

      if (error) {
        console.error('Error adding win:', error);
      }
    } catch (error) {
      console.error('Error in addWin:', error);
    }
  };

  return {
    stats,
    loading,
    updateStats,
    addWin,
    refetch: fetchUserStats,
  };
};
