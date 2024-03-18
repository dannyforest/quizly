import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Timer from "@/components/Timer.vue";

describe("TimerComponent", () => {
  let wrapper;
  beforeEach(() => {
    // Utilisez vi.useFakeTimers() pour simuler les timers
    vi.useFakeTimers();
    wrapper = shallowMount(Timer, {
      props: {
        duration: 120, // 2 minutes comme exemple
      },
    });
  });

  it("calcule correctement les minutes", () => {
    expect(wrapper.vm.minutes).toBe(2);
  });

  it("calcule correctement les secondes après une minute", () => {
    vi.advanceTimersByTime(60000); // Avancer le temps de 60 secondes
    // La minute a été écoulée, donc les minutes devraient être 1
    expect(wrapper.vm.minutes).toBe(1);
    // Les secondes devraient être 0 après une minute
    expect(wrapper.vm.seconds).toBe(0);
  });

  it("renders time left correctly", () => {
    expect(wrapper.text()).toContain("Time left: 2:00");
  });
});
