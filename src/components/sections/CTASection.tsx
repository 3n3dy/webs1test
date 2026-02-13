import { memo } from "react";
import { motion } from "framer-motion";
import { Mail, Zap, CheckCircle, Users } from "lucide-react";

export const CTASection = memo(() => {
  return (
    <div className="py-8 pb-3 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Готові навести лад у знаннях?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Замовте безкоштовну консультацію — ми проаналізуємо вашу ситуацію та
            запропонуємо рішення
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="flex items-center max-w-4xl mx-auto my-8 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent from-0% via-purple-400/40 via-40% to-purple-400 to-100%"></div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent from-0% via-purple-400/40 via-40% to-purple-400 to-100%"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-purple-200">
            Контакти
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Social Media */}
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/15">
              <a
                href="https://t.me/bonnie_benay"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                title="Telegram"
              >
                <img
                  alt="Telegram"
                  className="w-8 h-8"
                  src="https://img.icons8.com/color/48/telegram-app.png"
                />
              </a>
              <a
                href="viber://chat?number=%2B380950571649"
                className="hover:scale-110 transition-transform"
                title="Viber"
              >
                <img
                  alt="Viber"
                  className="w-8 h-8"
                  src="https://img.icons8.com/color/48/viber.png"
                />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587463958698"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                title="Facebook"
              >
                <img
                  alt="Facebook"
                  className="w-8 h-8"
                  src="https://img.icons8.com/color/48/facebook-new.png"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/zvychaika"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                title="LinkedIn"
              >
                <img
                  alt="LinkedIn"
                  className="w-8 h-8"
                  src="https://img.icons8.com/color/48/linkedin.png"
                />
              </a>
            </div>

            {/* Phone */}
            <a
              href="tel:+380950571649"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/15"
            >
              <img
                alt="Phone"
                className="w-7 h-7"
                src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
              />
              <span className="text-base sm:text-lg text-purple-100 hover:text-white transition-all duration-300 font-medium">
                +380 95 057 16 49
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:hanna.ws.g@gmail.com?subject=Консультація%20щодо%20структуризації&body=Привіт%2C%20Ганно%2C%0A%0A"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Mail className="w-8 h-8 text-purple-300 flex-shrink-0" />
              <span className="text-base sm:text-lg text-purple-100">
                hanna.ws.g@gmail.com
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="flex items-center max-w-7xl mx-auto my-7 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-purple-400"></div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400 to-purple-400"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-5">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Швидко",
                desc: "На 80% швидша адаптація",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Впевнено",
                desc: "10.000+ опрацьованих документів",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "З підтримкою",
                desc: "Не залишимо наодинці",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left ${index === 2 ? "md:ml-8" : ""}`}
              >
                <div className="text-purple-300 flex-shrink-0">{item.icon}</div>
                <div className="min-w-0">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-purple-200 text-sm whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});

CTASection.displayName = "CTASection";
