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
    console.error('Unhandled error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Arial' }}>
          <div style={{ background: '#fff1f0', border: '1px solid #ffccc7', borderRadius: 8, padding: 16 }}>
            <h2 style={{ margin: 0, color: '#a61e1e' }}>Something went wrong</h2>
            <p style={{ marginTop: 8, color: '#6b2a2a' }}>
              The application encountered an unexpected error. The details are shown below — you can copy them
              and share with a developer.
            </p>
            <details style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>
              <summary style={{ cursor: 'pointer' }}>Show error details</summary>
              <div style={{ marginTop: 8 }}>
                <strong>Error:</strong>
                <pre style={{ background: '#fff', padding: 8, borderRadius: 6, overflow: 'auto' }}>
                  {String(this.state.error)}
                </pre>
                {this.state.errorInfo && (
                  <>
                    <strong>Stack:</strong>
                    <pre style={{ background: '#fff', padding: 8, borderRadius: 6, overflow: 'auto' }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>
                )}
              </div>
            </details>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button onClick={() => window.location.reload()} style={{ padding: '6px 10px', borderRadius: 6 }}>
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
