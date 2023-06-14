const actions = {
    async fetchWallets({commit}, context){
        const {page = 1, limit = 10} = context;
        const URL = "http://localhost:3004/users"
        const response = await fetch(`${URL}?_page=${page}&_limit=${limit}`);
        const total = response.headers.get('X-Total-Count');
        const totalPages = total / limit;
        const nextPage = page + 1;
        const pagination = {
            count: parseInt(total),
            first: 1,
            actual: page,
            next: nextPage > totalPages ? undefined : nextPage,
            last: totalPages
        }
        const wallets = await response.json();
        commit("updateWallets", wallets);
        commit("updatePagination", pagination);
    }
}

export default actions