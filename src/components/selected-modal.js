import * as React from 'react';

import { View } from 'react-native';
import Button from './button';
import { Trash } from './icons'

function SelectedModal({ onDelete, onClose, style }) {
    return (
        <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 15, ...style }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <Button onPress={onDelete} style={{ marginHorizontal: 5 }} Icon={Trash} title='Sil' />
                <Button onPress={onClose} color='#48515B' style={{ backgroundColor: '#E8EAED', marginHorizontal: 5 }} title='Vazgeç' />
            </View>
        </View >
    );
}

export default SelectedModal;