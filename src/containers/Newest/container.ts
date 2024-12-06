import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { State, actions } from '@/store';

const mapStateToProps = (state: State) => ({
    landing: state.pageLanding,
    newest: state.containerNewest,
    // details: state.containerDetails,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    landing: bindActionCreators({ ...actions.pageLanding }, dispatch),
    newest: bindActionCreators({ ...actions.containerNewest }, dispatch),
    details: bindActionCreators({ ...actions.containerDetails }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}));