import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
                    <div className="max-w-2xl bg-slate-800 p-8 rounded-2xl shadow-2xl border border-red-500/20">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
                        <p className="text-slate-300 mb-4">The application crashed. Here is the error:</p>
                        <pre className="bg-slate-950 p-4 rounded-lg text-red-400 overflow-auto text-sm font-mono mb-4">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <p className="text-slate-400 text-xs">Check the console for more details.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
