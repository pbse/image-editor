import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, render } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('render correctly', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render children', () => {
    const app = mount(
        <App>
          <div>Drop an image or click to select a file to upload.</div>
        </App>
    );
    expect(app.html()).toMatchSnapshot();
});

it('should render an input HTML element', () => {
    const app = mount(
        <App>
          <div>Drop an image or click to select a file to upload.</div>
        </App>
      );
    expect(app.find('input').length).toEqual(1);
});

it('renders dynamic props on the input element', () => {
    const component = mount(
    	<App inputProps={{ style: 'display: none' }} />
    );
    expect(component.find('input').html()).toContain('style="display: none');
});

it('should check for the value of input', () => {
      const app = mount(
        <App />
      );
      expect(app.render().find('input').attr('value')).toBeUndefined();
      expect(app.render().find('input').attr('value', 10)).not.toBeUndefined();
      app.simulate('click');
      expect(app.render().find('input').attr('value')).toBeUndefined();
});


