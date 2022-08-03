import { inject, injectable } from "tsyringe";
import { IMedicsTokensRepository } from "@modules/medics/repositories/IMedicsTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { verify, sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IPayload {
  sub: string;
  cpf: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("MedicsTokensRepository")
    private medicsTokensRepository: IMedicsTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { cpf, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const medic_id = sub;

    const medicToken =
      await this.medicsTokensRepository.findByMedicIdAndRefreshToken(
        medic_id,
        token
      );

    if (!medicToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.medicsTokensRepository.deleteById(medicToken.id);

    const refresh_token = sign({ cpf }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.medicsTokensRepository.create({
      expires_date,
      refresh_token,
      medic_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: medic_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
