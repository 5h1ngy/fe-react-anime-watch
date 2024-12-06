import { connect } from "react-redux";

import { State } from '@/store';

const mapStateToProps = (state: State) => ({
    pageLanding: state.pageLanding,
    containerDetails: state.containerDetails,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}));