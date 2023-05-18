import React, { ErrorInfo, ReactNode } from "react";
import CenterLayout from "../layouts/CenterLayout";

interface ErrorBoundaryState {
  hasError: boolean;
}
interface Props {
  children: any;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
    // You can also log the error to an error tracking service
  }

  handleRetryClick = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <CenterLayout>
          <div>
            <h2>Oops, there is an error!</h2>
            <button type="button" onClick={this.handleRetryClick}>
              Go To Home
            </button>
          </div>
        </CenterLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
