const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const fetchData = async() => {
    setIsLoading(true);
    try {
      const response = await getAllPosts();
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, []);

console.log(data);

