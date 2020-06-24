import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import WithSpiner from '../../components/with-spiner/with-spiner.component'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertColectonsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions'

// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

// export default ShopPage;

const CollectionsOverviewWithSpiner = WithSpiner(CollectionsOverview);
const CollectionPageWithSpiner = WithSpiner(CollectionPage);

class ShopPage extends Component {
 state = {
   loading: true
 }

unsubscribeFromSnapshot = null

componentDidMount() {
  const {updateCollections} = this.props
  const collectionRef = firestore.collection('collections');
  collectionRef.onSnapshot( async snapshot =>{
    // console.log(snapshot);
   const collectionMap =  convertColectonsSnapshotToMap(snapshot)
   updateCollections(collectionMap);
   this.setState({loading: false})
    
  })
}
  
  render() {
    const {match} = this.props ;
    const {loading} = this.state
    return ( 
      <div className='shop-page'>
      <Route exact path={`${match.path}`} render={(props) =>  <CollectionsOverviewWithSpiner  isLoading ={loading}{...props}/>} />
    <Route path={`${match.path}/:collectionId`}  render={(props) =>  <CollectionPageWithSpiner isLoading ={loading}{...props}/>} />
    </div>
     );
  }
}
 
 const mapDispatchToProps = dispatsh => ({
  updateCollections: collectionMap =>
    dispatsh(updateCollections(collectionMap))
 })

export default connect(null, mapDispatchToProps)( ShopPage);
