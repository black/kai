
interface Props {
    children: React.ReactNode
}

const CodeBlock = (props: Props) => {
    const { children } = props
    return (
        <pre className="overflow-x-auto rounded-lg border bg-neutral-50 p-4 text-sm leading-6 text-neutral-800">
            <code>{children}</code>
        </pre>
    );
}

export default CodeBlock