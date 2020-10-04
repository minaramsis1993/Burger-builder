import React from 'react';
import Modal from '../components/UI/Modal/Modal';

export default function withErrorHandler(WrappedComponent, axios) {
  return class extends React.Component {
    // return <WrappedComponent {...props} />;
    state = {
      errMsg: null,
    };
    // DOING so before mounting its children .. it will watch for reqs && ress for them
    // NOT AFTER THEY ARE ALREADY RENDERED .. TO START WATHING FOR REQS & RESS ;)
    UNSAFE_componentWillMount() {
      const self = this;
      this.requestInterceptor = axios.interceptors.request.use(
        (req) => {
          self.setState({ errMsg: null });
          console.log(req);
          return req;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        }
      );

      this.responseInterceptor = axios.interceptors.response.use(
        function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        },
        function (error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          self.setState({ errMsg: error.message });
          return Promise.reject(error);
        }
      );
    }

    // PREVENTING MEMORY LEAKS
    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errBackdropHandler = () => {
      this.setState({ errMsg: null });
    };

    render() {
      return (
        <React.Fragment>
          {/* HERE USING MODAL FOR SHOWING ERR MSGS */}
          <Modal
            // show={this.state.errMsg}
            show={this.state.errMsg}
            backdropClickHandler={this.errBackdropHandler}
          >
            {this.state.errMsg}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
}
