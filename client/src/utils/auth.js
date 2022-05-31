import decode from 'jwt-decode';

class AuthService {
    // Decode token
    getProfile() {
        return decode(this.getToken());
    }

    // Check if user is currently logged in
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Check if token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // Retrieve token from localStorage
    getToken() {
        return localStorage.getItem('refreshr_token');
    }

    // Save token, reload page
    login(idToken) {
        localStorage.setItem("refreshr_token", idToken);
        window.location.assign('/');
    }

    // Clear token, logout with reload
    logout() {
        localStorage.removeItem('refreshr_token');
        window.location.assign('/');
    }
}

export default new AuthService();