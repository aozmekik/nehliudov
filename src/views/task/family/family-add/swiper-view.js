import * as React from 'react';

import { View, ScrollView } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";

import Button from '../../../../components/button';
import ButtonCard from '../../../../components/button-card';
import { Trash } from '../../../../components/icons';
import styles from './style';





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
            models: props.models,
            views: [],
        };

        this.selected = null;
        this.deleted = false;
        this.screenName = props.screenName;
        this.title = props.title;
        this.refRBSheet = React.createRef();
        this.onChange = props.onChange;
        this.image = props.image;

        this.state.views = this.modelToView(props.models);

    }

    modelToView(models) {
        let views = []
        for (let i = 0; i < models.length; ++i)
            views.push(this.getCardView(i, models[i]));
        return views;
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
        // delete from model
        const models = this.state.models;
        models.splice(this.selected, 1);

        const views = this.modelToView(models);


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

    getCardView(index, model) {
        const { navigation, modelClass } = this.props;
        let view;
        console.log(modelClass.expl(model));
        if (!this.image)
            view = <ButtonCard key={`${this.screenName}${index}`} onLongPress={() => this.select(index)} onPress={() => navigation.navigate(this.screenName, { model: model, index: index })} style={styles.input} title={modelClass.title(model)} desc={modelClass.expl(model)} />
        else
            view = <ButtonCard key={`${this.screenName}${index}`} onLongPress={() => this.select(index)} style={styles.input} image={model} />
        return view;
    }

    update() {
        const { route } = this.props;
        if (route.params?.key === this.screenName) {
            const { model, index } = route.params;
            const models = this.state.models;

            if (index != null) { // update exists
                models[index] = model;
                this.setState(prevState => ({ ...prevState, models: models }));
                this.onChange(models);
                const view = this.getCardView(index, models[index]);
                this.updateButtonCard(index, view);
            }
            else { // push new
                const newIndex = models.length;

                // push multiple model instance in the image case
                if (this.screenName === 'FamilyImage') {
                    const newModels = models.concat(model);
                    const views = this.modelToView(newModels);
                    this.setState(prevState => ({ views: views, models: newModels }));
                    this.onChange(newModels);
                }

                // push one only
                else {
                    const newModels = [...models, model];
                    this.setState(prevState => ({ ...prevState, models: newModels }));
                    this.onChange(newModels);
                    const view = this.getCardView(newIndex, newModels[newIndex]);
                    this.pushButtonCard(view);
                }

            }

            delete route.params;
        }



    }


    render() {
        const { navigation } = this.props;
        // const params = this.image ? { onSubmit: images => ({ models: images }) } : null;
        // console.log(this.screenName, params);
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ButtonCard onPress={() => navigation.navigate(this.screenName)} style={styles.input} title={this.title} />
                    <View>{this.state.views}</View>
                    <View style={styles.empty} />

                </ScrollView>
            </>
        );
    }
}


export default SwiperView;