import * as React from 'react';

import { View, StyleSheet, Text } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";

import Button from '../../../../components/button';
import ButtonCard from '../../../../components/button-card';
import { Trash } from '../../../../components/icons';




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



class SwiperView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            views: [],
        };

        this.selected = null;
        this.deleted = false;
        this.screenName = this.props.screenName;
        this.title = this.props.title;
        this.refRBSheet = React.createRef();
        this.onChange = this.props.onChange;
    }

    dismissSelect() {
        this.refRBSheet.current.close();
    }


    deselect() {
        if (!this.deleted) {
            const index = this.selected;
            const { selected, ...props } = this.state.views[index].props;
            const view = <ButtonCard selected={false} key={`${this.screenName}${index}`} {...props} />
            this.updateButtonCard(index, view);
        }
    }

    select(index) {
        const { selected, ...props } = this.state.views[index].props;
        const view = <ButtonCard selected={true} key={`${this.screenName}${index}`} {...props} />
        this.updateButtonCard(index, view);
        this.selected = index;
        this.deleted = false;
        this.refRBSheet.current.open();
    }

    deleteSelected() {
        // delete from view
        const views = this.state.views;
        views.splice(this.selected, 1);

        // delete from model
        const models = this.state.models;
        models.splice(this.selected, 1);


        this.setState({
            views: views,
            models: models
        }
        );
        this.onChange(models);


        this.deleted = true;
        this.refRBSheet.current.close();
    }

    updateButtonCard(index, view) {
        const views = this.state.views;
        views[index] = view;
        this.setState(prevState => ({ ...prevState, views: views }));
    }

    pushButtonCard(view) {
        const views = this.state.views;
        views.push(view);
        this.setState(prevState => ({ ...prevState, views: views }));
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        const { route, navigation } = this.props;
        if (route.params?.key === this.screenName) {
            const { model, title, expl, index } = route.params;
            const models = this.state.models;

            if (index != null) { // update exists
                models[index] = model;
                this.setState(prevState => ({ ...prevState, models: models }));
                this.onChange(models);
                const view = <ButtonCard key={`${this.screenName}${index}`} onLongPress={() => this.select(index)} onPress={() => navigation.navigate(this.screenName, { model: model, index: index })} style={styles.input} title={title} desc={expl} />
                this.updateButtonCard(index, view);
            }

            else { // push new
                const newIndex = models.length;
                const newModels = [...models, model]
                this.setState(prevState => ({ ...prevState, models: newModels }));
                this.onChange(newModels);
                const view = <ButtonCard key={`${this.screenName}${newIndex}`} onLongPress={() => this.select(newIndex)} onPress={() => navigation.navigate(this.screenName, { model: model, index: newIndex })} style={styles.input} title={title} desc={expl} />
                this.pushButtonCard(view);
            }

            delete route.params;
        }



    }


    render() {
        const { navigation } = this.props;
        return (
            <>
                <RBSheet
                    ref={this.refRBSheet}
                    closeOnDragDown={true}
                    height={hp('27%')}
                    onClose={() => this.deselect()}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent'
                        },
                        container: {
                            borderRadius: 10
                        },
                    }}
                >
                    <SelectedModal onDelete={() => this.deleteSelected()} onClose={() => this.dismissSelect()} />
                </RBSheet>
                <ButtonCard onPress={() => navigation.navigate(this.screenName)} style={styles.input} title={this.title} />
                <View>{this.state.views}</View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginHorizontal: 15,
    },
});

export default SwiperView;