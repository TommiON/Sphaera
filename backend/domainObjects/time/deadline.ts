interface Deadline {
    kind: 'training' | 'finances' | 'match' | 'transfer' | 'other';
    due: Date;
    expirationCallback: Function;
}

export default Deadline;