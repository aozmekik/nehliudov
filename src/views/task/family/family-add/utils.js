import { Alert} from 'react-native';


export default function mountPreventGoingBack() {
    this.props.navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        
        Alert.alert(
            'Uyarı',
            'Çıkmak İstediğinize Emin Misiniz?',
            [{
                text: 'İptal',
                style: 'cancel',
            },
            {
                text: 'Evet',
                style: 'ok',
                onPress: () => this.props.navigation.dispatch(e.data.action) 
            }
            ],
            {cancelable: true}
        );
    })
}
