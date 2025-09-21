export default function JobsList({
    jobs,
    className,
}: {
    jobs: string[];
    className?: string;
}) {
    return (
        <div>
            <ul className={className}>
                {jobs.map((job) => (
                    <li key={job}>{job}</li>
                ))}
            </ul>
        </div>
    );
}
