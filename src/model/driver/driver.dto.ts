import { IsString } from "class-validator";
import CreateUserDto from "../users/user.dto";

class CreateDriverDto extends CreateUserDto {
  @IsString()
  public phone: string;

  @IsString()
  public avatar: string;

  @IsString()
  public bikenumber: string;
  public sex: number;
  public inforbike: string;
  public status: string;
  public active_time: string;
}

export default CreateDriverDto;
