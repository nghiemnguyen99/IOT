import { IsString } from "class-validator";
import CreateUserDto from "../users/user.dto";

class CreateCustomerDto extends CreateUserDto {
  @IsString()
  public sdt: string;

  @IsString()
  public firstname: string;

  @IsString()
  public lastname: string;
  public sex: number;
  public avatar: string;
}

export default CreateCustomerDto;
