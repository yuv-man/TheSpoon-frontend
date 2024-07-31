const BACKEND_URL = 'https://thespoon-backend.onrender.com/'

export const SignUpApi = async(name, password) => {

    if (!name || !password) {
        return {error: 'All fields are required'};
    }

    try {
        // Send data to the API endpoint
        const response = await fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            const user = await response.json();
            return { user: user.id, success: 'Registration successful' };
        } else {
            const errorData = await response.json();
            return { error: errorData.message };
        }
    } catch (err) {
        return { error: err.message };
    }
};

export const LogInApi = async(name, password) => {
  
    try {
    // Send login data to the API endpoint
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            const user = await response.json();
            return { user: user.id, success: 'Logged in successfully' };
        } else {
            const errorData = await response.json();
            return { error: errorData.message };
        }
    } catch (err) {
        return { error: err.message };
    }
}
