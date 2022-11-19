// ref: https://blog.logrocket.com/how-to-build-a-progress-bar-indicator-in-next-js/#using-react-spinners
//      https://www.davidhu.io/react-spinners/

import {HashLoader} from 'react-spinners'
import React from "react";
// import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <HashLoader
                color="#eeeeee"
                size={60}
            />
        </div>
     );
}

export default Loader;

// class AwesomeComponent extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         loading: true,
//       };
//     }

//     render() {
//         return (
//           <div className="sweet-loading">
//             <HashLoader
//               cssOverride={override}
//               size={150}
//               color={"#123abc"}
//               loading={this.state.loading}
//               speedMultiplier={1.5}
//               aria-label="Loading Spinner"
//               data-testid="loader"
//             />
//           </div>
//         );
//       }
//     }