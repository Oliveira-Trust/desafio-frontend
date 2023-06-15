const mutations = {
    updateWallets (state, wallets) {
        state.wallets = wallets.map(wallet => {
          return {
              id: wallet.id,
              nome: wallet.nome,
              sobrenome: wallet.sobrenome,
              email: wallet.email,
              bitcoin: wallet.valor_carteira
          }
        })
      },
      createWallet(state, wallet){
        const newWallets = state.wallets;
        newWallets.push(wallet);
        state.wallets = newWallets.map(wallet => {
            return {
                id: wallet.id,
                nome: wallet.nome,
                sobrenome: wallet.sobrenome,
                email: wallet.email,
                bitcoin: wallet.valor_carteira
            }
          })
      },
      updatePagination(state, pagination){
        state.pagination = pagination;
      },
      updateAmount(state, amount){
        state.amount = amount
      }
}

export default mutations