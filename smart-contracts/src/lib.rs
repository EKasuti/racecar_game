#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{pallet_prelude::*, traits::Randomness};
use frame_system::pallet_prelude::*;
use sp_runtime::traits::StaticLookup;
use sp_std::prelude::*;

#[frame_support::pallet]
pub mod pallet {
    use super::*;

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
        type Randomness: Randomness<Self::Hash, Self::BlockNumber>;
    }

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    #[pallet::storage]
    #[pallet::getter(fn collections)]
    pub type Collections<T: Config> = StorageMap<_, Blake2_128Concat, T::AccountId, u32, ValueQuery>;

    #[pallet::storage]
    #[pallet::getter(fn nfts)]
    pub type NFTs<T: Config> = StorageDoubleMap<
        _,
        Blake2_128Concat,
        u32,
        Blake2_128Concat,
        u32,
        (T::AccountId, Vec<u8>),
        ValueQuery,
    >;

    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        CollectionCreated(T::AccountId, u32),
        NFTMinted(T::AccountId, u32, u32),
    }

    #[pallet::error]
    pub enum Error<T> {
        CollectionNotFound,
        NFTNotFound,
    }

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        #[pallet::weight(10_000)]
        pub fn create_collection(origin: OriginFor<T>) -> DispatchResult {
            let who = ensure_signed(origin)?;
            let collection_id = <Collections<T>>::get(&who);
            let new_collection_id = collection_id.saturating_add(1);
            <Collections<T>>::insert(&who, new_collection_id);
            Self::deposit_event(Event::CollectionCreated(who, new_collection_id));
            Ok(())
        }

        #[pallet::weight(10_000)]
        pub fn mint_nft(
            origin: OriginFor<T>,
            collection_id: u32,
            metadata: Vec<u8>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;
            ensure!(<Collections<T>>::contains_key(&who), Error::<T>::CollectionNotFound);
            let nft_id = <NFTs<T>>::get(collection_id, who.clone()).0.saturating_add(1);
            <NFTs<T>>::insert(collection_id, nft_id, (who.clone(), metadata));
            Self::deposit_event(Event::NFTMinted(who, collection_id, nft_id));
            Ok(())
        }
    }
}