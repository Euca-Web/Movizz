import React, { Component, ErrorInfo, ReactNode } from 'react';
import '../../styles/components/ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erreur attrapée par ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oups ! Quelque chose s'est mal passé.</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="error-boundary-button"
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
