export interface RedisInplayTeamEntity {
  team_id: string;
  team_logo: string;
  team_fullname: string;
  createdAt: number;
  updatedAt: number;
  data_last_10: string | null | number;
}
