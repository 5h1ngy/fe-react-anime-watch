import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { State, actions } from '@/store';

const mapStateToProps = (state: State) => ({
    landing: state.pageLanding,
    myList: state.containerMyList,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    landing: bindActionCreators({ ...actions.pageLanding }, dispatch),
    myList: bindActionCreators({ ...actions.containerMyList }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}));