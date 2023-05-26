import { motion } from 'framer-motion';

const Header_bar = () => {
  return (
    <motion.div
      className="header_bar"
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { ease: 'linear' },
        layout: { duration: 0.8 },
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <h1 className="display-6">🐱 gatoCh@t 🐈</h1>
    </motion.div>
  );
};

export default Header_bar;
