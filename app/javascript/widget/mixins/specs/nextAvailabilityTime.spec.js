import { createWrapper } from '@vue/test-utils';
import nextAvailabilityTimeMixin from '../nextAvailabilityTime';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      DAY_NAMES: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
  },
});
describe('nextAvailabilityTimeMixin', () => {
  const waselchatWebChannel = {
    workingHoursEnabled: true,
    workingHours: [
      {
        day_of_week: 0,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
      {
        day_of_week: 1,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
      {
        day_of_week: 2,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
      {
        day_of_week: 3,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
      {
        day_of_week: 4,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
      {
        day_of_week: 5,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
      {
        day_of_week: 6,
        open_hour: 9,
        closed_all_day: false,
        open_minutes: 0,
        close_hour: 17,
      },
    ],
  };

  beforeEach(() => {
    window.waselchatWebChannel = waselchatWebChannel;
  });

  afterEach(() => {
    delete window.waselchatWebChannel;
  });

  beforeEach(() => {
    vi.useRealTimers();
  });

  it('should return day names', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    expect(wrapper.vm.dayNames).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('should return channelConfig', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    expect(wrapper.vm.channelConfig).toEqual(waselchatWebChannel);
  });

  it('should return workingHours', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    expect(wrapper.vm.workingHours).toEqual(waselchatWebChannel.workingHours);
  });

  it('should return currentDayWorkingHours', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const currentDay = new Date().getDay();
    const expectedWorkingHours = waselchatWebChannel.workingHours.find(
      slot => slot.day_of_week === currentDay
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    expect(wrapper.vm.currentDayWorkingHours).toEqual(expectedWorkingHours);
  });

  it('should return nextDayWorkingHours', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const currentDay = new Date().getDay();
    const nextDay = currentDay === 6 ? 0 : currentDay + 1;
    const expectedWorkingHours = waselchatWebChannel.workingHours.find(
      slot => slot.day_of_week === nextDay
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    expect(wrapper.vm.nextDayWorkingHours).toEqual(expectedWorkingHours);
  });

  it('should return presentHour', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    expect(wrapper.vm.presentHour).toBe(new Date().getHours());
  });

  it('should return presentMinute', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    expect(wrapper.vm.presentMinute).toBe(new Date().getMinutes());
  });

  it('should return currentDay', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date();
    const day = date.getDay();
    const currentDay = Object.keys(wrapper.vm.dayNames).find(
      key => wrapper.vm.dayNames[key] === wrapper.vm.dayNames[day]
    );
    expect(wrapper.vm.currentDay).toBe(Number(currentDay));
  });

  it('should return currentDayTimings', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const {
      open_hour: openHour,
      open_minutes: openMinute,
      close_hour: closeHour,
    } = wrapper.vm.currentDayWorkingHours;
    expect(wrapper.vm.currentDayTimings).toEqual({
      openHour,
      openMinute,
      closeHour,
    });
  });

  it('should return nextDayTimings', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const { open_hour: openHour, open_minutes: openMinute } =
      wrapper.vm.nextDayWorkingHours;

    expect(wrapper.vm.nextDayTimings).toEqual({
      openHour,
      openMinute,
    });
  });

  it('should return dayDiff', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDay = wrapper.vm.currentDay;
    const nextDay = wrapper.vm.nextDayWorkingHours.day_of_week;
    const totalDays = 6;
    const expectedDayDiff =
      nextDay > currentDay
        ? nextDay - currentDay - 1
        : totalDays - currentDay + nextDay;

    expect(wrapper.vm.dayDiff).toEqual(expectedDayDiff);
  });

  it('should return dayNameOfNextWorkingDay', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const nextDay = wrapper.vm.nextDayWorkingHours.day_of_week;
    const expectedDayName = wrapper.vm.dayNames[nextDay];
    expect(wrapper.vm.dayNameOfNextWorkingDay).toEqual(expectedDayName);
  });

  it('should return hoursAndMinutesBackInOnline', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayCloseHour =
      waselchatWebChannel.workingHours[wrapper.vm.currentDay].close_hour;
    const nextDayOpenHour =
      waselchatWebChannel.workingHours[
        wrapper.vm.currentDay === 6 ? 0 : wrapper.vm.currentDay + 1
      ].open_hour;
    const nextDayOpenMinute =
      waselchatWebChannel.workingHours[
        wrapper.vm.currentDay === 6 ? 0 : wrapper.vm.currentDay + 1
      ].open_minutes;
    const expectedHoursAndMinutes =
      wrapper.vm.getHoursAndMinutesUntilNextDayOpen(
        nextDayOpenHour,
        nextDayOpenMinute,
        currentDayCloseHour
      );
    expect(wrapper.vm.hoursAndMinutesBackInOnline).toEqual(
      expectedHoursAndMinutes
    );
  });

  it('should return getNextDay', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    expect(wrapper.vm.getNextDay(6)).toBe(0);
  });

  it('should return in 30 minutes', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    vi.useFakeTimers('modern').setSystemTime(
      new Date('Thu Apr 14 2022 23:04:46 GMT+0530')
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.timeSlot = {
      day: 4,
      from: '12:00 AM',
      openAllDay: false,
      to: '08:00 AM',
      valid: true,
    };
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    waselchatWebChannel.workingHours[4].open_hour = 18;
    waselchatWebChannel.workingHours[4].open_minutes = 0;
    waselchatWebChannel.workingHours[4].close_hour = 23;
    expect(wrapper.vm.timeLeftToBackInOnline).toBe('in 30 minutes');
  });

  it('should return in 3 hours', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    vi.useFakeTimers('modern').setSystemTime(
      new Date('Thu Apr 14 2022 23:04:46 GMT+0530')
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.timeSlot = {
      day: 4,
      from: '12:00 PM',
      openAllDay: false,
      to: '11:30 PM',
      valid: true,
    };
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    waselchatWebChannel.workingHours[4].open_hour = 19;
    expect(wrapper.vm.timeLeftToBackInOnline).toBe('in 2 hours');
  });

  it('should return at 10:00 AM', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    vi.useFakeTimers('modern').setSystemTime(
      new Date('Thu Apr 14 2022 23:04:46 GMT+0530')
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.timeSlot = {
      day: 4,
      from: '10:00 AM',
      openAllDay: false,
      to: '11:00 AM',
      valid: true,
    };
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    waselchatWebChannel.workingHours[4].open_hour = 10;
    expect(wrapper.vm.timeLeftToBackInOnline).toBe('at 10:00 AM');
  });

  it('should return tomorrow', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    vi.useFakeTimers('modern').setSystemTime(
      new Date('Thu Apr 14 2022 23:04:46 GMT+0530')
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.timeSlot = {
      day: 0,
      from: '12:00 AM',
      openAllDay: false,
      to: '08:00 AM',
      valid: true,
    };
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    waselchatWebChannel.workingHours[4].open_hour = 9;
    waselchatWebChannel.workingHours[4].close_hour = 16;
    expect(wrapper.vm.timeLeftToBackInOnline).toBe('tomorrow');
  });

  it('should return on Saturday', () => {
    const Component = {
      render() {},
      mixins: [nextAvailabilityTimeMixin],
      i18n,
    };
    vi.useFakeTimers('modern').setSystemTime(
      new Date('Thu Apr 14 2022 23:04:46 GMT+0530')
    );
    const Constructor = Vue.extend(Component);
    const vm = new Constructor().$mount();
    const wrapper = createWrapper(vm);
    wrapper.vm.timeSlot = {
      day: 0,
      from: '12:00 AM',
      openAllDay: false,
      to: '08:00 AM',
      valid: true,
    };
    wrapper.vm.dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    waselchatWebChannel.workingHours[4].open_hour = 9;
    waselchatWebChannel.workingHours[4].close_hour = 16;
    waselchatWebChannel.workingHours[5].closed_all_day = true;
    expect(wrapper.vm.timeLeftToBackInOnline).toBe('on Saturday');
  });
});
