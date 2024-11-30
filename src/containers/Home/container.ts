import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { State, actions } from '@/store';

const mapStateToProps = (state: State) => ({
    ...state.pageLanding,
    ...state.containerHome,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...actions.pageLanding,
    ...actions.containerHome,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}));