import { z } from "zod";

export const profileSchema = z.object({
  nome: z
    .string()
    .nonempty("O Campo nome é obrigatório.")
    .regex(
      new RegExp(/^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)*$/),
      "O nome deve conter somente letras."
    ),

  sobrenome: z
    .string()
    .nonempty("O Campo sobrenome é obrigatório.")
    .regex(
      new RegExp(/^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)*$/),
      "O sobrenome deve conter somente letras."
    ),
  email: z.string().email("Digite um E-mail válido."),
  valor_carteira: z
    .string()
    .regex(new RegExp(/^\d+(\.\d{1,5})?$/), "Digite somente números, de 1 a 5.")
    .transform(Number),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
