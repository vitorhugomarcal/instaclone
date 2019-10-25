 
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Image } from 'react-native';

import LazyImage from '../../components/LazyImage';

import { Container, HeaderTop, Post, Header, Avatar, Name, ActionsB, Description, Loading, HeaderBottom } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';

import logo from '../../assets/instagram.png';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) return;
    if (loading) return;

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=4&_page=${pageNumber}`
    );

    const totalItems = await response.headers.get('X-Total-Count');
    const data = await response.json();

    setLoading(false);
    setTotal(Math.floor(totalItems / 4));
    setPage(pageNumber + 1);

    setFeed(shouldRefresh ? data : [...feed, ...data]);
  }

  async function refreshList() {
    setRefreshing(true);
    
    await loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <Container>
      <HeaderTop>
        <Icon 
          name='camera-outline'
          size={25}
          color='#fff'
        />
        <Image
          source={logo}
          style={{ marginLeft: 10, marginTop: 5}}
        />
        <Icon2 
          name='live-tv'
          size={25}
          color='#fff'
          style={{ flex: 7 ,textAlign: 'right', marginRight: 5 }}
        />
        <Icon3 
          name='send'
          size={25}
          color='#fff'
          style={{ flex: 1 ,textAlign: 'right', marginLeft: 5 }}
        />
      </HeaderTop>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={item => String(item.id)}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
              <Icon2 
                name= 'more-vert'
                color= '#fff'
                size={25}
                style={{ flex: 1 ,textAlign: 'right' }}
              />
            </Header>

            <LazyImage
              aspectRatio={item.aspectRatio} 
              shouldLoad={viewable.includes(item.id)} 
              smallSource={{ uri: item.small }}
              source={{ uri: item.image }}
            />

            <ActionsB>
              <Icon2 
                name= 'favorite-border'
                color= '#fff'
                size={30}
                style={{ margin: 10 }}
              />
              <Icon3 
                name= 'message-circle'
                color= '#fff'
                size={30}
                style={{textAlign: 'left' }}
              />
              <Icon3 
                name='send'
                size={30}
                color='#fff'
                style={{margin: 10, textAlign: 'left' }}
              />
              <Icon3 
                name= 'bookmark'
                color= '#fff'
                size={30}
                style={{flex: 1, margin: 10, textAlign: 'right' }}
              />
            </ActionsB>

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    <HeaderBottom>
      <Icon 
        name= 'home-variant'
        color= '#fff'
        size={25}
        style={{ margin: 10 }}
      />
      <Icon3 
        name= 'search'
        color= '#fff'
        size={25}
        style={{ margin: 10 }}
      />
      <Icon
        name= 'plus-box-outline'
        color= '#fff'
        size={25}
        style={{ margin: 10 }}
      />
      <Icon2 
        name= 'favorite-border'
        color= '#fff'
        size={25}
        style={{ margin: 10 }}
      />
      <Icon3 
        name= 'user'
        color= '#fff'
        size={25}
        style={{ margin: 10 }}
      />
    

    </HeaderBottom>
     
    </Container>
  );
}
