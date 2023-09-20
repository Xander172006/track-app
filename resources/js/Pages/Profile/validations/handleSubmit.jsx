export function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
    post('/create-account', data); 
}
