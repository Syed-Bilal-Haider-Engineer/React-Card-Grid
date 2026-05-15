import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUserService } from "../../../features/auth/auth.service";


export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (user) {
        navigate("/dashboard", { replace: true });
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUpUser = async (
    e: React.FormEvent<HTMLFormElement | String>
  ) => {
    e.preventDefault();

    if (loading) return; // prevent double submit

    setLoading(true);
    setError("");

    try {
      const result = await signUpUserService({
        id: Date.now().toString(),
        name: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup success:", result);

      // better than alert
      navigate("/login", { replace: true });

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Start your journey with us today.</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={signUpUser}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="form-input"
              placeholder="User name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};