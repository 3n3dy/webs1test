import { memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Briefcase, Award, Target, Lightbulb, Wrench, Heart } from 'lucide-react';

const TOOLS = [
  { category: 'База', items: ['Google Workspace', 'Microsoft Office'] },
  { category: 'Системи', items: ['ERP', 'CRM', 'Таск-менеджери'] },
  { category: 'Технології', items: ['AI-інструменти (Google Certified)', 'Автоматизація'] },
  { category: 'Візуал', items: ['Графічний дизайн (сертифікат)'] }
];

const EXPERIENCE = [
  {
    period: '2023 – 2026',
    title: 'Операційне управління',
    description: 'Поєднувала понад 100 функцій: від польської бухгалтерії до навчання нових співробітників. Була «місточком» між відділами.'
  },
  {
    period: '2023 (6 місяців)',
    title: 'Оптимізація складу',
    description: 'Запровадила електронний облік та адресне зберігання. Час на пошук товару скоротився з 10 до 2 хвилин.'
  },
  {
    period: '2019 – 2021',
    title: 'Запуск «з нуля»',
    description: 'Відкривала кур\'єрську службу: від ремонту приміщення до найму персоналу та налагодження логістики.'
  },
  {
    period: '2017 – 2019',
    title: 'Від офіс-менеджера до керівника',
    description: <>Керувала бізнес-центром (13 000 кв.м) - цей етап навчив мене бачити бізнес як великий механізм, де кожна деталь важлива. <p>З офіс-менеджера за рік стала керівником матеріально-технічного відділу.</p></>
  }
];

const AboutAuthorModal = memo(() => {
  return (
    <Dialog.Root>
      {/* Trigger */}
      <Dialog.Trigger asChild>
        <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-6 cursor-pointer hover:bg-white/15 transition-all hover:scale-[1.02] group w-fit mx-auto">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-400">
            <img src="/public/masterhanna.jpg" alt="Hanna" className="w-full h-full object-cover" />
          </div>
          <div className='pr-4'>
            <p className="text-white text-lg font-medium pr-4">Ганна Марчак</p>
            <p className="text-purple-300 text-sm pr-6">Knowledge Management Consultant</p>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <Dialog.Title className="text-3xl font-semibold flex items-center gap-3">
                <Award className="w-8 h-8" />
                Про мене та чому з'явилася «Звичаїка»
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="hover:bg-white/20 rounded-full p-2 transition-all outline-none border-none focus:outline-none">

                  <X size={28} />
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Description className="sr-only">
              Інформація про автора - Ганну Марчак, спеціалістку з управління знаннями
            </Dialog.Description>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Вступ */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-600" />
                  Вітаю! Мене звати Ганна
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Я не буду розповідати, що знаю секрет успіху, який змінить ваш бізнес за ніч. Але я точно знаю, як це — бути людиною, яка відповідає «за все» одночасно: від складних фінансових звітів до заміни картриджа в принтері чи налаштування CRM.
                  </p>
                  <p>
                    Більшість мого досвіду пройшла в «операційці». Я була тим менеджером, до якого бігли, коли щось зламалося, хтось звільнився або просто незрозуміло, як працювати далі. Саме через ці сотні дрібних запитів я зрозуміла: <strong>бізнесу не потрібні складні стратегії, йому потрібні зрозумілі звичаї.</strong>
                  </p>
                </div>
              </section>

              {/* Досвід */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  Мій шлях у цифрах та фактах
                </h3>
                <p className="text-gray-700 mb-4">
                  Я вірю в систему, яка не тисне на людей, а допомагає їм. За останні роки я встигла попрацювати в абсолютно різних сферах, і всюди моїм завданням було приборкати хаос.
                </p>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="border-l-4 border-purple-500 pl-5 py-2 hover:bg-purple-50 transition-colors rounded-r-xl">
                      <span className="text-purple-600 font-semibold text-sm block mb-1">{exp.period}</span>
                      <h4 className="font-semibold text-gray-900 mb-1">{exp.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Інструменти */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-purple-600" />
                  Що я використовую в роботі?
                </h3>
                <p className="text-gray-700 mb-4">
                  Я фанат автоматизації, але тільки тієї, що полегшує життя.
                </p>
                <div className="space-y-3">
                  {TOOLS.map((tool, i) => (
                    <div key={i} className="bg-purple-50 p-4 rounded-xl">
                      <p className="font-semibold text-purple-900 mb-2">{tool.category}:</p>
                      <div className="flex flex-wrap gap-2">
                        {tool.items.map((item, j) => (
                          <span key={j} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Чому довірити */}
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-600">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-purple-600" />
                  Чому мені можна довірити ваші процеси?
                </h3>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    Тому що я була на вашому місці й на місці ваших працівників. Я знаю, як дратує відсутність інструкцій і як вигорає власник, коли кожне дрібне питання замикається на ньому.
                  </p>
                  <p>
                    Мій проєкт <strong className="text-purple-700">ЗВИЧАЇКА</strong> — це спроба перетворити хаотичні «гасіння пожеж» на спокійну корпоративну культуру. Поки ви фокусуєтеся на розвитку чи просто п'єте чай, я створюю систему, де кожен знає, що і як йому робити.
                  </p>
                  <p className="font-semibold text-purple-900 text-lg">
                    Просто порядок, який працює.
                  </p>
                </div>
              </section>

              {/* Системи та інструменти */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                  Системи та інструменти: Гнучкість без обмежень
                </h3>
                <p className="text-gray-700 mb-4">
                  У проекті «ЗВИЧАЇКА» ми не підлаштовуємо ваш бізнес під можливості конкретної програми. Навпаки — ми обираємо або адаптуємо інструменти під ваші звичаї та процеси.
                </p>
                <div className="bg-white border-2 border-purple-200 rounded-xl p-5 space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-2">Мій підхід до вибору систем:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1 font-semibold">✓</span>
                      <span><strong>Без «грубих» обмежень:</strong> Якщо ваш бізнес вже працює в певній системі або ви розглядаєте специфічний софт — це не стане перепоною.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1 font-semibold">✓</span>
                      <span><strong>Швидка адаптація:</strong> Моя експертиза дозволяє опанувати будь-який новий інструмент на рівні профі за лічені дні.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1 font-semibold">✓</span>
                      <span><strong>Фокус на результаті:</strong> Я досліджую інструмент, налаштую та інтегрую так, щоб він працював на вас.</span>
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-3 rounded-lg mt-4">
                    <p className="text-sm text-purple-900 font-medium">
                      <strong>Важливо:</strong> Ми обираємо інструмент, який буде ефективним саме для вашої корпоративної культури, а не той, який «простіше налаштувати».
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer Button */}
              <div className="text-center">
                <Dialog.Close asChild>
                  <button
                    onClick={() => window.open('https://forms.gle/uSNtM1HLngGEXucUA', '_blank')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all hover:scale-105"
                  >
                    Зв'язатися зі мною
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

AboutAuthorModal.displayName = 'AboutAuthorModal';

export default AboutAuthorModal;
