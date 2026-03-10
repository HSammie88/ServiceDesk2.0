interface IDepartment {
  depart_id: number;
  depart_name: string;
}

interface IPosition {
  position_id: number;
  position_name: string;
  depart_id: number;
}

interface IUser {
  user_id: number;
  last_name: string;
  first_name: string;
  surname?: string;
  user_login: string;
  user_password: string;
  depart_id: number;
  position_id: number;
  user_is_admin: boolean;
}

export { type IDepartment, type IPosition, type IUser };
