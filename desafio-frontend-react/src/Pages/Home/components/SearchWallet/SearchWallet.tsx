import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import styles from "./SearchWallet.module.css";

const searchSchema = z.object({
  nome: z.string(),
  sobrenome: z.string(),
  email: z.string(),
});

type SearchSchema = z.infer<typeof searchSchema>;

export function SearchWallet({ setSearchResults }: any) {
  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  function handleAddWallet(data: SearchSchema) {
    console.log(data);
    setSearchResults(data);
    reset();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleAddWallet)}
        className={styles.searchValidation}
      >
        <div className="searchDivInput">
          <input
            id="nome"
            placeholder="Nome"
            type="text"
            {...register("nome")}
          />
          {errors.nome && <p className={styles.erros}>{errors.nome.message}</p>}
        </div>
        <div className={styles.searchDivInput}>
          <input
            id="sobrenome"
            placeholder="Sobrenome"
            type="text"
            {...register("sobrenome")}
          />
          {errors.sobrenome && (
            <p className={styles.erros}>{errors.sobrenome.message}</p>
          )}
        </div>
        <div className={styles.searchDivInput}>
          <input
            id="email"
            placeholder="E-mail"
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.erros}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.searchDivButton}>
          <button className={`${styles.buttonSearch}  `}>
            <i className="pi pi-search" style={{ paddingRight: "10px" }}></i>
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
