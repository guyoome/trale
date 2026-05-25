import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

const SignupPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const { error: signUpError } = await authClient.signUp.email({
            name,
            email,
            password,
        })

        if (signUpError) {
            setError(signUpError.message ?? "Erreur lors de l'inscription")
            setLoading(false)
            return
        }

        navigate({ to: "/" })
    }

    return (
        <div className="h-svh bg-background flex flex-col items-center justify-center max-w-md mx-auto px-4">
            <h1 className="text-2xl font-bold font-heading mb-8">Créer un compte</h1>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Nom
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                        placeholder="Jean Dupont"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                        placeholder="email@exemple.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium disabled:opacity-50"
                >
                    {loading ? "Création..." : "Créer un compte"}
                </button>
            </form>

            <p className="mt-4 text-sm text-muted-foreground">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary underline">
                    Se connecter
                </Link>
            </p>
        </div>
    )
}

export const Route = createFileRoute("/signup")({
    component: SignupPage,
})
