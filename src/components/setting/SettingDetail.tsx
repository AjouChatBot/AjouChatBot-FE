interface SettingDetailProps {
  label: string | null;
  value: string | null;
}

const SettingDetail: React.FC<SettingDetailProps> = ({ label, value }) => {
  return (
    <div className='flex justify-between'>
      <div className='text-mono_a text-base font-medium'>{label}</div>
      <div className='text-mono_c text-base font-medium'>{value}</div>
    </div>
  );
};

export default SettingDetail;
