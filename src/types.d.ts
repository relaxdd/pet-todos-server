export interface TodoItem {
  id: number,
  user_id: number,
  title: string,
  completed: boolean,
  created_at: string
}

export interface UserItem {
  id: number,
  login: string,
  email: string,
  password: string,
  created_at: string
}
