import Navbar from './components/navbar';
import SearchBar from './components/searchbar';
import Categories from './components/categories';
import ListingCard from './components/listingcard';
import Footer from './components/footer';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <Categories />
      <div className="listings-container">
        {/* Mock listings */}
        <ListingCard 
          image="https://img.freepik.com/premium-photo/purple-bohemian-bedroom-design_636537-515507.jpg?w=826" 
          title="Stay in Prince’s Purple Rain house" 
          type="Entire home"
          guests="2 guests" 
          bedrooms="1 bedroom" 
          bathrooms="1 bath"
          price="$7 per night" 
          rating="5.0"
        />
        <ListingCard 
          image="https://img.freepik.com/free-photo/landscape-sunset-architectural-matrix-stunning-modern-villa-with-swimming-pool_1409-5155.jpg?t=st=1728063926~exp=1728067526~hmac=d0bb2fdec6927039c6c90d05b3e142982f34f3396d748903b84c02a818ac240e&w=996" 
          title="Sleepover at Polly Pocket’s Compact" 
          type="Private room"
          guests="4 guests" 
          bedrooms="2 bedrooms" 
          bathrooms="1 bath"
          price="Sold out" 
          rating="4.9"
        />
        <ListingCard 
          image="https://img.freepik.com/premium-photo/model-house-with-red-roof-clock-front_862994-438113.jpg?w=740" 
          title="Live like a Hobbit in the Shire" 
          type="Entire home"
          guests="3 guests" 
          bedrooms="1 bedroom" 
          bathrooms="1 bath"
          price="$10 per night" 
          rating="4.8"
        />
        <ListingCard 
          image="https://img.freepik.com/premium-photo/castle-with-castle-top-tree-front_1013369-92561.jpg?w=996" 
          title="Experience luxury in a French Chateau" 
          type="Entire home"
          guests="6 guests" 
          bedrooms="3 bedrooms" 
          bathrooms="2 baths"
          price="$500 per night" 
          rating="4.9"
        />
        <ListingCard 
          image="https://img.freepik.com/free-photo/view-tank-container-water-storage_23-2151748289.jpg?t=st=1728065028~exp=1728068628~hmac=5b899336bd8d86b5cc0d0add3d54d55aabf5838150f97a37e9768de043368e91&w=826" 
          title="Beachside Villa with Ocean View" 
          type="Entire home"
          guests="8 guests" 
          bedrooms="4 bedrooms" 
          bathrooms="3 baths"
          price="$700 per night" 
          rating="5.0"
        />
        <ListingCard 
          image="https://img.freepik.com/premium-photo/wooden-cabins-woods_743855-61397.jpg?w=996" 
          title="Rustic Cabin in the Woods" 
          type="Entire cabin"
          guests="5 guests" 
          bedrooms="2 bedrooms" 
          bathrooms="1 bath"
          price="$120 per night" 
          rating="4.7"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
