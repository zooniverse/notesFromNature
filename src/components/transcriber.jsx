import React from 'react';
import { connect } from 'react-redux';
import NavBar from 'components/transcriber/navbar';
import ImageViewer from 'components/transcriber/image_viewer';
import ImageSelector from 'components/transcriber/image_selector';
import Form from 'components/transcriber/form';
import * as action from 'actions/transcriber_actions';

class Transcriber extends React.Component {
    componentDidMount() {
        const { collection, dispatch } = this.props;
        dispatch(action.selectField(collection.fields[0].name));

        // Adjust surrounding markup to handle the fixed footer
        this.margin = document.body.style.margin;
        this.overflow = document.body.style.overflow;
        this.background = document.body.style.background;
        this.position = document.position;
        this.minHeight = document.minHeight;
        document.position = 'relative';
        document.minHeight = '100%';
        document.body.style.margin = 0;
        document.body.style.overflow = 'hidden';
        document.body.style.background = 'url("/images/transcribers/bg-transcriber.png")';
    }
    componentWillUnmount() {
        document.position = this.position;
        document.minHeight = this.minHeight;
        document.body.style.margin = this.margin;
        document.body.style.overflow = this.overflow;
        document.body.style.background = this.background;
    }
    render() {
        console.log('Transcriber');
        const { collection, form, dispatch } = this.props;
        const { subject, imageSelected, fieldSelected } = form;

        let images = subject.images.map((image, i) => {
            let isSelected = image.location == imageSelected;
            return(
                <ImageViewer key={i} src={image.location} subject={subject}
                    isSelected={isSelected} />
            );
        });

        let footer = subject.images.length < 2 ? undefined :
            <ImageSelector subject={subject}
                imageSelected={imageSelected}
                onImageSelectorClick={src => dispatch(action.selectImage(src))} />;

        return (
            <div>
                <NavBar data={collection} />
                {images}
                {footer}
                <Form fields={collection.fields}
                    focused={fieldSelected}
                    helpExpanded={form.helpExpanded}
                    onFieldFocus={n => dispatch(action.selectField(n))}
                    onFieldChange={(n, v, ...a) => dispatch(action.updateField(n, v, a))}
                    onToggleHelp={() => dispatch(action.toggleHelp())}
                    onSkip={() => dispatch(action.skipSubject())}
                    onSubmit={e => dispatch(action.submitSubject())} />
            </div>
        );
    }
}

function select(state) {
    return {
        collection: state.collection,
        form: state.form,
    };
}

export default connect(select)(Transcriber);
