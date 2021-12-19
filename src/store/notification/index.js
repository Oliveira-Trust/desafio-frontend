
export const state = {
    notification: {
        type: 'normal',
        message: 'Mensagem',
        show: false
    }

}

export const mutations = {
    SET_NOTIFICATION (state, notification) {
        state.notification = notification;
    },
    CLOSE_NOTIFICATION (state) {
        state.notification.show = false;
    }
}

export const actions = {
    showNotification ({ commit }, notification) {
        commit('SET_NOTIFICATION', { ...notification, show: true });
    },
    closeNotification ({ commit }) {
        commit('CLOSE_NOTIFICATION');
    }
}