// components/WidgetContent.js

const WidgetContent = ({ content }) => {
    return (
      <div className="p-4" style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
        <h3 className="text-lg font-bold">Widget {content}</h3>
        <p>This is the content of the widget {content}.</p>
      </div>
    );
  };
  
  export default WidgetContent;
  