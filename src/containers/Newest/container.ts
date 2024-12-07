import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { State, actions } from '@/store';

const mapStateToProps = (state: State) => ({
    pageLanding: state.pageLanding,
    containerNewest: state.containerNewest,
    containerMyList: state.containerMyList,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    pageLanding: bindActionCreators(actions.pageLanding, dispatch),
    containerNewest: bindActionCreators(actions.containerNewest, dispatch),
    containerMyList: bindActionCreators(actions.containerMyList, dispatch),
})

const bind = connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}));

export default bind

export type Bind = ConnectedProps<typeof bind>