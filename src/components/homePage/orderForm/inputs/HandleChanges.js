export default function handleBasicChange(setter) {
    return (e) => setter({
        title: e.title,
        value: e.value
    });
}