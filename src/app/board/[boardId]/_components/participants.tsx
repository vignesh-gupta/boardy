
const Participants = () => {
  return (
    <div className="absolute h-12 top-2 right-2 p-3 bg-white rounded-md flex items-center shadow-md">
      List of user
    </div>
  );
};

export default Participants;

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 p-3 bg-white rounded-md flex items-center shadow-md w-[100px]" />
  );
};
